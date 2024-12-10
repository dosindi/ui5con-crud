import React, { useState, useEffect } from "react";
import { Panel, Bar, Button, Title } from "@ui5/webcomponents-react";
import TransactionDialog from "./TransactionDialog";
import TransactionTable from "./TransactionTable";
import BalanceBox from "./BalanceBox";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  payee: "",
  category: "",
  paymentMethod: "",
  cashFlow: "",
  amount: "",
  comment: "",
};

// Mock transactions for demonstration
const mockTransactions = [
  {
    id: "1",
    date: "2024-12-01",
    payee: "Grocery Store",
    category: "Food",
    paymentMethod: "Credit Card",
    cashFlow: "debit",
    amount: 50.25,
    comment: "Weekly groceries",
  },
  {
    id: "2",
    date: "2024-12-03",
    payee: "Electric Company",
    category: "Utilities",
    paymentMethod: "Bank Transfer",
    cashFlow: "debit",
    amount: 120.75,
    comment: "Monthly electric bill",
  },
  {
    id: "3",
    date: "2024-12-05",
    payee: "Salary",
    category: "Income",
    paymentMethod: "Bank Transfer",
    cashFlow: "credit",
    amount: 2000.0,
    comment: "Monthly salary",
  },
];

export default function Transactions() {
  const [formState, setFormState] = useState(initialState);
  const [transactionDialogState, setTransactionDialogState] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const i18nBundle = useI18nBundle("myApp");

  useEffect(() => {
    // Replace API call with mock data initialization
    setTransactions(mockTransactions);
  }, []);

  const onNewTransactionClick = () => {
    setFormState(initialState);
    setTransactionDialogState(true);
  };

  return (
    <>
      <BalanceBox transactions={transactions} />
      <p />
      <Panel
        fixed="true"
        style={{ width: "100%" }}
        header={
          <Bar
            startContent={
              <Title>{i18nBundle.getText("transactionList")}</Title>
            }
            endContent={
              <Button onClick={onNewTransactionClick}>
                {i18nBundle.getText("newTransactionButton")}
              </Button>
            }
          />
        }
      >
        <TransactionTable
          transactionsData={transactions}
          setTransactions={setTransactions}
          setFormState={setFormState}
          setTransactionDialogState={setTransactionDialogState}
        />
        <TransactionDialog
          formState={formState}
          setFormState={setFormState}
          transactionDialogState={transactionDialogState}
          setTransactionDialogState={setTransactionDialogState}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </Panel>
    </>
  );
}
