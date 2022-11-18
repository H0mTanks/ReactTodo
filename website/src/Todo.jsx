import { GlobalContext } from "./GlobalContext";
import { useContext, useState } from "react";

export function Todo() {
  return (
    <section className="container vert-offset-top-2">
      <div id="todoBox" className="todoBox col-xs-6 col-xs-offset-3">
        <TodoBox />
      </div>
    </section>
  );
}

function TodoBox() {
  const { data, setData, currEmail } = useContext(GlobalContext);

  function generateId() {
    return data.length + 1;
  }

  function postData(newData) {
    fetch("http://localhost:5001/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currEmail, userData: newData }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          alert("Network Error", "Data not updated on server");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleNodeRemoval(nodeId) {
    const newData = data.filter((el) => {
      return el.id !== nodeId;
    });

    setData(newData);
    postData(newData);
    return;
  }

  function handleSubmit(task) {
    const id = generateId();
    const complete = false;
    const newData = [...data, { id, task, complete }];
    setData(newData);
    postData(newData);
  }

  function handleToggleComplete(nodeId) {
    const filterData = data.filter((item) => item.id !== nodeId);
    const toToggleItem = data.find((item) => item.id === nodeId);

    toToggleItem.complete = !toToggleItem.complete;
    const newData = [toToggleItem, ...filterData];
    setData(newData);
    postData(newData);
    return;
  }

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
      <TodoList
        data={data}
        removeNode={handleNodeRemoval}
        toggleComplete={handleToggleComplete}
      />
      <TodoForm onTaskSubmit={handleSubmit} />
      <SignOutButton />
    </div>
  );
}

function TodoList({ data, removeNode, toggleComplete }) {
  const listNodes = data.map((listItem) => {
    return (
      <TodoItem
        key={listItem.id}
        nodeId={listItem.id}
        task={listItem.task}
        complete={listItem.complete}
        removeNode={removeNode}
        toggleComplete={toggleComplete}
      />
    );
  });

  return <ul className="list-group">{listNodes}</ul>;
}

function TodoItem({ nodeId, task, complete, removeNode, toggleComplete }) {
  let classes = "list-group-item clearfix";
  if (complete === true) {
    classes = classes + " list-group-item-success";
  }

  return (
    <li className={classes}>
      {task}
      <div className="pull-right" role="group">
        <button
          type="button"
          className="btn btn-xs btn-success img-circle"
          onClick={() => toggleComplete(nodeId)}
        >
          &#x2713;
        </button>{" "}
        <button
          type="button"
          className="btn btn-xs btn-danger img-circle"
          onClick={() => removeNode(nodeId)}
        >
          &#xff38;
        </button>
      </div>
    </li>
  );
}

function TodoForm({ onTaskSubmit }) {
  const [task, setTask] = useState("");

  function onChangeHandler(e) {
    setTask(e.target.value);
  }

  function doSubmit(e) {
    e.preventDefault();
    if (task.length === 0) {
      return;
    }
    onTaskSubmit(task);
    setTask("");
  }

  return (
    <div className="commentForm vert-offset-top-2">
      <hr />
      <div className="clearfix">
        <form className="todoForm form-horizontal" onSubmit={doSubmit}>
          <div className="form-group">
            <label htmlFor="task" className="col-md-2 control-label">
              Task
            </label>
            <div>
              <input
                type="text"
                id="task"
                className="form-control"
                placeholder="What do you need to do?"
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="mt-3">
              <input
                type="submit"
                value="Save Item"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignOutButton() {
  const { setIsLogin } = useContext(GlobalContext);

  return (
    <button onClick={() => setIsLogin(false)} className="btn btn-danger mt-2">
      Sign Out
    </button>
  );
}
