import React, { useRef } from "react";
import {
  Form,
  FormItem,
  Input,
  DatePicker,
  TextArea,
  Dialog,
  Bar,
  Button,
  ComboBox,
  ComboBoxItem,
  RadioButton,
  Toast,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

function TransactionDialog({
  formState,
  setFormState,
  transactionDialogState,
  setTransactionDialogState,
  transactions,
  setTransactions,
}) {
  const i18nBundle = useI18nBundle("myApp");
  const toast = useRef();

  async function handleInputChanges(key, value) {
    if (key === "date") {
      const awsDate = new Date(value).toISOString().split("T")[0];
      value = awsDate;
    }
    if (key === "amount" && value !== null && value.trim() !== "") {
      value = parseFloat(value);
    }
    setFormState({ ...formState, [key]: value });
  }

  const onSaveClick = () => {
    if (
      !formState.date ||
      !formState.payee ||
      !formState.category ||
      !formState.paymentMethod ||
      !formState.cashFlow ||
      !formState.amount
    ) {
      toast.current.show();
    } else {
      addTransaction();
      setTransactionDialogState(false);
    }
  };

  function addTransaction() {
    const transaction = { ...formState };

    if (formState.id) {
      // Update
      const transactionIndex = transactions.findIndex(
        (e) => e.id === formState.id
      );
      const newTransactions = [...transactions];
      newTransactions[transactionIndex] = { ...transaction };
      setTransactions(newTransactions);
    } else {
      // Create
      const newTransaction = {
        ...transaction,
        id: transactions.length + 1, // Simulating unique ID
        createdAt: new Date().toISOString(),
      };
      setTransactions([...transactions, newTransaction]);
    }
  }

  const formTransaction = (
    <>
      <Form>
        <FormItem label={i18nBundle.getText("transactionDate")}>
          <DatePicker
            required="true"
            value={new Date(formState.date + "T00:00:00").toLocaleDateString(
              navigator.language,
              { month: "short", day: "numeric", year: "numeric" }
            )}
            onChange={(event) => handleInputChanges("date", event.detail.value)}
          />
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionPayee")}>
          <Input
            required="true"
            value={formState.payee}
            onInput={(event) => handleInputChanges("payee", event.target.value)}
          />
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionCategory")}>
          <ComboBox
            filter="StartsWithPerTerm"
            value={formState.category}
            onChange={(event) =>
              handleInputChanges("category", event.target.value)
            }
            onInput={(event) =>
              handleInputChanges("category", event.target.value)
            }
            required="true"
          >
            <ComboBoxItem text={i18nBundle.getText("categoryMeal")} />
            <ComboBoxItem text={i18nBundle.getText("categoryMarket")} />
            <ComboBoxItem text={i18nBundle.getText("categoryCar")} />
            <ComboBoxItem text={i18nBundle.getText("categoryHome")} />
            <ComboBoxItem text={i18nBundle.getText("categoryWork")} />
          </ComboBox>
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionPaymentMethod")}>
          <Input
            required="true"
            value={formState.paymentMethod}
            onInput={(event) =>
              handleInputChanges("paymentMethod", event.target.value)
            }
          />
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionCashFlow")}>
          <RadioButton
            name="GroupA"
            text={i18nBundle.getText("transactionDebit")}
            checked={formState.cashFlow === "debit"}
            value="debit"
            onChange={(event) =>
              handleInputChanges("cashFlow", event.target.value)
            }
          />
          <RadioButton
            name="GroupA"
            text={i18nBundle.getText("transactionCredit")}
            checked={formState.cashFlow === "credit"}
            value="credit"
            onChange={(event) =>
              handleInputChanges("cashFlow", event.target.value)
            }
          />
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionAmount")}>
          <Input
            required="true"
            value={formState.amount}
            onInput={(event) =>
              handleInputChanges("amount", event.target.value)
            }
          />
        </FormItem>
        <FormItem label={i18nBundle.getText("transactionComment")}>
          <TextArea
            required="false"
            rows="3"
            growing="false"
            style={{ width: "450px" }}
            value={formState.comment}
            onInput={(event) =>
              handleInputChanges("comment", event.target.value)
            }
          />
        </FormItem>
      </Form>
      <Toast ref={toast}>
        {i18nBundle.getText("transactionDialogValidation")}
      </Toast>
    </>
  );

  return (
    <Dialog
      headerText={i18nBundle.getText("transactionDialogTitle")}
      resizable="true"
      open={transactionDialogState}
      onAfterClose={() => {
        setTransactionDialogState(false);
      }}
      footer={
        <Bar
          endContent={
            <>
              <Button
                icon="sys-cancel"
                onClick={() => {
                  setTransactionDialogState(false);
                }}
              >
                {i18nBundle.getText("transactionDialogCancelButton")}
              </Button>
              <Button icon="save" onClick={onSaveClick}>
                {i18nBundle.getText("transactionDialogSaveButton")}
              </Button>
            </>
          }
        />
      }
    >
      {formTransaction}
    </Dialog>
  );
}

export default TransactionDialog;
