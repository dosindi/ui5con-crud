import React from "react";
import {
  AnalyticalTable,
  FlexBox,
  Button,
  Badge,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

function TransactionTable({
  transactionsData,
  setTransactions,
  setFormState,
  setTransactionDialogState,
}) {
  const i18nBundle = useI18nBundle("myApp");

  const onEditTransaction = (row) => {
    setFormState(transactionsData[row.index]);
    setTransactionDialogState(true);
  };

  function onDeleteTransaction(rowIndex) {
    const transactionId = transactionsData[rowIndex].id;

    // Simulate deletion by filtering out the transaction locally
    const updatedTransactions = transactionsData.filter(
      (item) => item.id !== transactionId
    );
    setTransactions(updatedTransactions);
  }

  const columns = [
    {
      Header: i18nBundle.getText("transactionDate"),
      accessor: "date",
      Cell: (instance) => {
        const newDate = new Date(instance.cell.value + "T00:00:00");
        const options = { month: "short", day: "numeric", year: "numeric" };
        return newDate.toLocaleDateString(navigator.language, options);
      },
    },
    {
      Header: i18nBundle.getText("transactionPayee"),
      accessor: "payee",
    },
    {
      Header: i18nBundle.getText("transactionCategory"),
      accessor: "category",
    },
    {
      Header: i18nBundle.getText("transactionPaymentMethod"),
      accessor: "paymentMethod",
    },
    {
      Header: i18nBundle.getText("transactionCashFlow"),
      accessor: "cashFlow",
      Cell: (instance) => {
        return (
          <Badge colorScheme={instance.cell.value === "debit" ? "3" : "6"}>
            {instance.cell.value}
          </Badge>
        );
      },
    },
    {
      Header: i18nBundle.getText("transactionAmount"),
      accessor: "amount",
      Cell: (instance) => {
        const options = {
          style: "decimal",
          maximumFractionDigits: "2",
          minimumFractionDigits: "2",
        };
        return(
		   <div style={{ textAlign: "right" }}>
			   {instance.cell.value.toLocaleString(navigator.language, options)}
			</div>
		);
      },
    },
    {
      id: "actions",
      Header: i18nBundle.getText("actions"),
      width: 100,
      disableResizing: true,
      Cell: (instance) => {
        return (
          <FlexBox>
            <Button
              design="Transparent"
              icon="edit"
              onClick={(e) => {
                e.markerAllowTableRowSelection = true;
                onEditTransaction(instance.row);
              }}
            />
            <Button
              design="Transparent"
              icon="delete"
              style={{ color: "red" }}
              onClick={(e) => {
                e.markerAllowTableRowSelection = true;
                onDeleteTransaction(instance.row.index);
              }}
            />
          </FlexBox>
        );
      },
    },
  ];

  return (
    <AnalyticalTable
      infiniteScroll="true"
      infiniteScrollThreshold="10"
      minRows="10"
      sortable="true"
      filterable="true"
      visibleRows="10"
      columns={columns}
      data={transactionsData}
    />
  );
}

export default TransactionTable;
