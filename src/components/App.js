import React, { useState, useEffect } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import Logitem from "./Logitem";
import AddLogItems from "./AddLogItems";
import { ipcRenderer } from "electron";

const App = () => {
  const [logs, setlogs] = useState([]);

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      setlogs(JSON.parse(logs));

      ipcRenderer.on("logs:clear", () => {
        setlogs([]);
        shownAlert("Logs Cleared");
      });
    });
  }, []);

  const [alert, setalert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const addItem = (item) => {
    if (item.text === "" || item.user === "" || item.priority === "") {
      shownAlert("Please Enter the all the fields", "danger");
      return false;
    }
    // item._id = Math.floor(Math.random() * 90000) + 10000;
    // item.created = new Date().toString();
    // setlogs([...logs, item]);

    ipcRenderer.send("logs:add", item);
    shownAlert("Log added");
  };

  const shownAlert = (message, varient = "success", seconds = 3000) => {
    setalert({
      show: true,
      message: message,
      variant: varient,
    });

    setTimeout(() => {
      setalert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  };

  const deleteItem = (id) => {
    // setlogs(logs.filter((item) => item._id !== id));
    // shownAlert("Log deleted");
    //console.log(id);

    ipcRenderer.send("logs:delete", id);
    shownAlert("Log added");
  };

  return (
    <Container>
      <AddLogItems addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <Logitem key={log._id} log={log} deleteItems={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
