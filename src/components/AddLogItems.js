import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";

function AddLogItems({ addItem }) {
  const [text, settext] = useState("");
  const [user, setuser] = useState("");
  const [priority, setpriority] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addItem({ text, user, priority });

    settext("");
    setuser("");
    setpriority("");
  };
  return (
    <Container>
      <Card className="mt-5 mb-3">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Row className="my-3">
              <Col>
                <Form.Control
                  placeholder="Log"
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="my-3">
              <Col>
                <Form.Control
                  placeholder="User"
                  value={user}
                  onChange={(e) => setuser(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={(e) => setpriority(e.target.value)}
                >
                  <option value="0">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className="my-3">
              <Col>
                <Button type="submit" variant="secondary" block>
                  Add Log
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddLogItems;
