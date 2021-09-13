import { Container } from './styled'
import { Link } from 'react-router-dom'

export default function Oie() {
    return (
        <Container>
            <div className="box">
                <img src="/assets/svgs/logo.svg" style={{ width: "25vw", height: "25vh" }} />
                <h1><span>Dev</span> Store</h1>
            </div>
           
            <h1 className="goHome"><Link to="/">Go back to home page</Link></h1>
        </Container>
    )
}