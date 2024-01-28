import React from "react";
import axios from "axios";
import "./Affiliate.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "date", headerName: "Date Requested", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "amount", headerName: "Amount Requested", width: 150 },
  {
    field: "account",
    headerName: "Account Details",
    sortable: false,
    width: 550,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

const apiUrl = "https://a1api.onrender.com/api/";
// const apiUrl = "http://localhost:4000/api/";

const Affiliate = () => {
  const [withdrawals, setWithdrawals] = React.useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = React.useState("Loading");
  const [confirmedWithdrawals, setConfirmedWithdrawals] =
    React.useState("Loading");
  const [users, setUsers] = React.useState([]);
  const [noOfAffiliates, setNoOfAffiliates] = React.useState("Loading");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [errormessage, setErrorMessage] = React.useState({
    error: false,
    message: "",
  });

  const getUsers = async () => {
    try {
      await axios
        .get(apiUrl + "user/users")
        .then((data) => {
          let userss = data.data.users;
          userss = userss.reverse();
          setUsers(userss);
          setNoOfAffiliates(data.data.affiliateUsers);
          getWithdrawals(userss);
        })
        .catch((error) => {
          setNoOfAffiliates("0");
        });
    } catch (error) {
      throw error;
    }
  };

  const getWithdrawals = async (users) => {
    try {
      await axios
        .get(apiUrl + "admin/withdrawals", {
          headers: { "auth-token": localStorage.getItem("adminkey") },
        })
        .then((data) => {
          let pending = 0;
          let confirmed = 0;
          const withdraws = [];
          data.data.map((withdrawal) => {
            withdrawal.id = withdrawal._id;
            withdrawal.date = new Date(withdrawal.createdAt)
              .toString()
              .split("GMT")[0];
            users.map((user) => {
              if (user.email === withdrawal.email) {
                withdrawal.account = user.accountDetails;
              }
            });
            if (withdrawal.status === "pending") {
              pending++;
            }
            if (withdrawal.status.includes("confirm")) {
              confirmed++;
            }

            withdraws.push(withdrawal);
          });

          setPendingWithdrawals(pending);
          setConfirmedWithdrawals(confirmed);
          setWithdrawals(withdraws.reverse());
          //   console.log(withdraws);
        })
        .catch((error) => {
          setErrorMessage({
            error: true,
            message: "An error occurred, please refresh the page",
          });
          // console.log(error);
        });
    } catch (error) {
      setErrorMessage({
        error: true,
        message: "An error occurred, please refresh the page",
      });
      throw error;
    }
  };

  const changeWithdrawalstatus = async (status) => {
    // console.log(selectedRows, status);

    selectedRows.map(async (id) => {
      await axios
        .patch(
          apiUrl + "admin/withdrawals",
          {
            status: status,
            id: id,
            email: withdrawals.find((wi) => {
              return wi.id === id;
            }).email,
          },
          {
            headers: { "auth-token": localStorage.getItem("adminkey") },
          }
        )
        .then(() => {
          setErrorMessage({
            error: false,
            message: `Withdrawal: ${id} has been changed to ${status}`,
          });
        })
        .catch((error) => {
          setErrorMessage({
            error: true,
            message: "An error occurred, please try again",
          });
          console.log(error);
        });
    });

    getUsers();
  };

  React.useEffect(() => {
    getUsers();
    // getWithdrawals();
  }, []);

  return (
    <div>
      {errormessage.message && (
        <p
          style={{
            color: "white",
            padding: 20,
            background: errormessage.error ? "red" : "green",
          }}
        >
          {errormessage.message}
        </p>
      )}
      <h1>Affiliate Mangement</h1>
      <section className="affiliate-cards">
        <article>
          <h3>Total Number of affiliates</h3>
          <p>{noOfAffiliates}</p>
        </article>
        <article>
          <h3>Total Number of withdrawals</h3>
          <p>{withdrawals.length}</p>
        </article>
        <article>
          <h3>Total Number of pending withdrawals</h3>
          <p>{pendingWithdrawals}</p>
        </article>
        <article>
          <h3>Total Number of confirmed withdrawals</h3>
          <p>{confirmedWithdrawals}</p>
        </article>
      </section>
      <h2>All Withdrawals Requested</h2>
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <p>Actions</p>
        <button
          disabled={!Boolean(selectedRows.length)}
          className="confirm-btn"
          onClick={() => {
            changeWithdrawalstatus("confirmed");
          }}
        >
          Confirm Withdrawal
        </button>
        <button
          disabled={!Boolean(selectedRows.length)}
          onClick={() => {
            changeWithdrawalstatus("rejected");
          }}
          className="reject-btn"
        >
          Reject Withdrawal
        </button>
      </div>
      <div>
        <DataGrid
          rows={withdrawals}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          isRowSelectable={(params) => params.row.status === "pending"}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedRows(newRowSelectionModel);
          }}
        />
      </div>
    </div>
  );
};

export default Affiliate;
