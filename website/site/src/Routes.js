import { Route, Switch, BrowserRouter} from 'react-router-dom';



import Home from './pages/home/homeIndex'
import ErrorPage from './pages/ErrorPage';

export default function Roteamento() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Home}></Route>
                <Route path="*" component={ErrorPage}></Route>
            </Switch>
        </BrowserRouter>
    )
}