import React from "react";

const Transaction = (props) => {
  return (
    <tr>
      <td>{props.t.date}</td>
      <td>{props.t.description}
          <button className="ui button" type="submit" onClick={() => props.delete(props.t.id)}>
            Delete
          </button>
          </td>
      <td>{props.t.category}</td>
      <td>{props.t.amount}</td>
    </tr>
  );
};

export default Transaction;
