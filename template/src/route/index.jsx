import React from 'react';
import {
	Router,
	Route,
	Switch
} from 'react-router-dom';
import Loadable from 'react-loadable'
import history from '../components/public/history';
import Index from '../components/home/index'

const components = (loader, loading) => {
	return {
		loader: () => loader,
		loading: () => {
			return loading || <div>Loading...</div>
		}
	}
}

const Tui = Loadable(components(import('../components/list/tui')));
const Page1 = Loadable(components(import('../components/page/page1')));
const Page2 = Loadable(components(import('../components/page/page2')));

const routes = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/tui" render={() => <Tui />} />
				<Index>
					<Route exact path="/" render={() => <Page1 />} />
					<Route path="/page_1" render={() => <Page1 />} />
					<Route path="/page_2" render={() => <Page2 />} />
				</Index>
			</Switch>
		</Router>
	)
}

export default routes;