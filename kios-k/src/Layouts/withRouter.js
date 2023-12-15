import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import '../PageTransition.css';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <SwitchTransition>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <Component
                        {...props}
                        router={{ location, navigate, params }}
                    />
                </CSSTransition>
            </SwitchTransition>
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;