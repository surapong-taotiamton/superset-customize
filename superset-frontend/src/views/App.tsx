/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { Suspense, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { GlobalStyles } from 'src/GlobalStyles';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Loading from 'src/components/Loading';
import Menu from 'src/features/home/Menu';
import getBootstrapData from 'src/utils/getBootstrapData';
import ToastContainer from 'src/components/MessageToasts/ToastContainer';
import setupApp from 'src/setup/setupApp';
import setupPlugins from 'src/setup/setupPlugins';
import { routes, isFrontendRoute } from 'src/views/routes';
import { Logger, LOG_ACTIONS_SPA_NAVIGATION } from 'src/logger/LogUtils';
import setupExtensions from 'src/setup/setupExtensions';
import { logEvent } from 'src/logger/actions';
import { store } from 'src/views/store';
import { RootContextProviders } from './RootContextProviders';
import { ScrollToTop } from './ScrollToTop';
import { Layout, Breadcrumb , Button } from "antd";

const { Header, Content, Footer, Sider } = Layout;
import { useSelector, useDispatch } from 'react-redux';
import { changeHeader } from 'src/components/CustomHeader/actions'
import DynamicHeader from 'src/components/CustomHeader/DynamicHeader'

setupApp();
setupPlugins();
setupExtensions();

const bootstrapData = getBootstrapData();

let lastLocationPathname: string;

const boundActions = bindActionCreators({ logEvent }, store.dispatch);

const LocationPathnameLogger = () => {
  const location = useLocation();
  useEffect(() => {
    // This will log client side route changes for single page app user navigation
    boundActions.logEvent(LOG_ACTIONS_SPA_NAVIGATION, {
      path: location.pathname,
    });
    // reset performance logger timer start point to avoid soft navigation
    // cause dashboard perf measurement problem
    if (lastLocationPathname && lastLocationPathname !== location.pathname) {
      Logger.markTimeOrigin();
    }
    lastLocationPathname = location.pathname;
  }, [location.pathname]);
  return <></>;
};

// const DynamicHeader = function() {

//   const dataFromState: any[] = useSelector((state: any) => state.changeHeaderReducer); // ดึง state ส่วน user
//   const dispatch = useDispatch();

//   const testAdd = function() {
//     let data = [
//       {
//         label: 'Home',
//       },
//       {
//         label: <a href="">Application Center</a>,
//       },
//       {
//         label: <a href="">Application List</a>,
//       },
//       {
//         label: 'An Application',
//       },
//     ];

//     dispatch( changeHeader(data));
//   }

//     return (
//       <div>
//         <Breadcrumb>
//           {dataFromState.map( (item) => {
//             return (<Breadcrumb.Item>
//               {item.label}
//             </Breadcrumb.Item>
//             );
//           }) }
//       </Breadcrumb>

//         <Button onClick = { testAdd } >
//           Hello world
//         </Button>
//       </div>
//     );
// }



const App = () => (
  <Router>
    <ScrollToTop />
    <LocationPathnameLogger />
    <RootContextProviders>
      <GlobalStyles />
      
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ backgroundColor: "yellow" }}>
          <div className="demo-logo-vertical" />
        </Sider>
        <Layout>
          <Header style={{ 
            padding: 0,
            backgroundColor: '#42f2f5' 
            }}>
              <DynamicHeader></DynamicHeader>
            </Header>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360
              }}
            >
              <Switch>
                {routes.map(({ path, Component, props = {}, Fallback = Loading }) => (
                  <Route path={path} key={path}>
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <Component user={bootstrapData.user} {...props} />
                      </ErrorBoundary>
                    </Suspense>
                  </Route>
                ))}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
    </Layout>


      
      
      <ToastContainer />
    </RootContextProviders>
  </Router>
);

export default hot(App);
