import React from "react";
import { Card, CardTitle, CardBody, CardSubtitle, CardText } from "reactstrap";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo});
        console.log({error});
        console.log({errorInfo});
    }

    render() {
        
        if (this.state.hasError) {
            return <>
                <div className="error-boundary">
                    <Card
                        body
                        color="danger"
                        inverse
                    >
                        <CardBody>
                            <CardTitle tag="h5">
                                Error: {this.state.error?.code}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {this.state.error?.message}
                            </CardSubtitle>
                            <CardText>
                                {this.state.error?.stack}
                                <br />
                                <br />
                                {this.state.errorInfo?.componentStack}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;