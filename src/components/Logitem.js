import React from "react";
import { Button, Badge } from "react-bootstrap";
import Moment from "react-moment";

function Logitem({ log, deleteItems }) {
  const setVariant = () => {
    if (log.priority === "high") {
      return "danger";
    } else if (log.priority === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <tr>
      <td>
        <Badge variant={setVariant()} className="p-2">
          {log.priority.charAt(0).toUpperCase() + log.priority.slice(1)}
        </Badge>
      </td>
      <td>{log.text}</td>
      <td>{log.user}</td>
      <td>
        <Moment format="MMMM Do YYYY ,h:mm:ss a">
          {new Date(log.created)}
        </Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteItems(log._id)}>
          x
        </Button>
      </td>
    </tr>
  );
}

export default Logitem;
