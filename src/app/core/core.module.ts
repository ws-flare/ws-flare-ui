import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloLink, split} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {localStorageSync} from 'ngrx-store-localstorage';
import {storeLogger} from 'ngrx-store-logger';
import {setContext} from 'apollo-link-context';
import {AppState} from '../app.state';
import {environment} from '../../environments/environment';
import {UserState} from '../user/user.state';
import {customStorage} from '../custom-local-storage';
import {reducer as userReducer} from '../user/user.reducer';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from 'apollo-utilities';
import {WebSocketLink} from 'apollo-link-ws';

export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user'], rehydrate: true, storage: customStorage})(reducer);
}

const authLink = setContext((_, {headers}) => {
  const user: UserState = JSON.parse(localStorage.getItem('user'));

  return {
    headers: {
      ...headers,
      authorization: user.user && user.user.token ? `Bearer ${user.user.token}` : ''
    }
  };
});

export const metaReducers = [localStorageSyncReducer];

if (environment.logger) {
  metaReducers.push(logger);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({user: userReducer}, {metaReducers}),
    EffectsModule.forRoot([]),

    // Apollo
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class CoreModule {
  constructor(@Inject(PLATFORM_ID) platformId: string,
              apollo: Apollo,
              httpLink: HttpLink) {
    let link;
    if (isPlatformBrowser(platformId)) {

      const wsProtocol = window.location.hostname === 'localhost' ? 'ws' : 'ws';
      const wsPort = window.location.hostname === 'localhost' ? ':3001' : '';

      const wsClient = new SubscriptionClient(`${wsProtocol}://${window.location.hostname}${wsPort}/subscriptions`, {
        reconnect: true
      });

      const wsLink = new WebSocketLink(wsClient);

      link = ApolloLink.from([
        authLink,
        httpLink.create({uri: '/graphql'})
      ]);

      link = split(
        ({query}) => {
          const res = getMainDefinition(query);
          return res.kind === 'OperationDefinition' && res.operation === 'subscription';
        },
        wsLink,
        link
      );
    } else {
      link = ApolloLink.from([
        authLink,
        httpLink.create({uri: '/graphql'})
      ]);
    }

    apollo.create({
      link,
      cache: new InMemoryCache({}),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    });
  }

}
