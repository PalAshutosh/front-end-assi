import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Modal } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Form States
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter((task) => task.id !== id));
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentTask(null);
        setTitle('');
        setDescription('');
        setStatus('pending');
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                // Update
                const { data } = await api.put(`/tasks/${currentTask.id}`, {
                    title, description, status
                });
                setTasks(tasks.map(t => t.id === currentTask.id ? data : t));
            } else {
                // Create
                const { data } = await api.post('/tasks', {
                    title, description, status
                });
                setTasks([...tasks, data]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filter === 'all' || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <Container className="mt-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="mb-1 fw-bold">Dashboard</h2>
                    <p className="text-muted mb-0">Welcome back, {user?.username}!</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={handleCreate} className="px-4 shadow-sm">
                        <i className="bi bi-plus-lg me-2"></i> + Add New Task
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4 g-3">
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Search tasks by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="shadow-sm"
                    />
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="shadow-sm"
                    >
                        <option value="all">Filter by Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Col key={task.id} md={6} lg={4} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <Card.Title className="h5 mb-0 text-truncate" style={{ maxWidth: '70%' }}>{task.title}</Card.Title>
                                        <Badge bg={
                                            task.status === 'completed' ? 'success' :
                                                task.status === 'in-progress' ? 'warning' : 'secondary'
                                        } pill>
                                            {task.status}
                                        </Badge>
                                    </div>
                                    <Card.Text className="text-muted flex-grow-1">
                                        {task.description || "No description provided."}
                                    </Card.Text>
                                    <div className="mt-3 d-flex justify-content-end gap-2 border-top pt-3">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(task)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <h4 className="text-muted">No tasks found</h4>
                        <p>Get started by creating a new task.</p>
                    </Col>
                )}
            </Row>

            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;
