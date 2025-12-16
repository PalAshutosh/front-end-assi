import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="white" variant="light" expand="lg" className="border-bottom sticky-top" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    <i className="bi bi-check2-square me-2"></i>TaskApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="me-3">Dashboard</Nav.Link>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="rounded-pill px-3">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="primary" size="sm" className="rounded-pill px-3">
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
