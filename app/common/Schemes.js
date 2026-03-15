import {
  formatString,
  scheme_installment_insert,
  user_schemes_insert,
} from "../../DBHelper/queries.js";
import pool from "../../db.js";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";
import { logger } from "../../pinoLogger.js";
import { Middleware } from "../commonRoute.js";

export const CreateSchemeSubscription = async (data) => {
  return {
    CreateNewUserScheme: await CreateNewUserScheme(data),
  };
};

const CreateNewUserScheme = async (data) => {
  try {
    const { user_id, schemeData } = data;
    const { scheme_id, planLength } = schemeData;
    logger.info(user_id, scheme_id);
    const startDate = new Date();
    const futureDate = new Date(
      new Date().setMonth(startDate.getMonth() + planLength),
    );
    const uuid = uuidv4();
    const [rows] = await pool.query(user_schemes_insert, [
      uuid,
      user_id,
      scheme_id,
      startDate,
      futureDate,
      "active",
    ]);

    logger.info("result : ", rows);
    const installmentCreationResult = await CreateInstallmentRecords(
      data,
      uuid,
    );
    return {
      status: 1,
      result: "Data Inserted",
      installmentResult: installmentCreationResult,
    };
  } catch (err) {
    console.error(err);
    return { status: 0, details: err };
  }
};

const CreateInstallmentRecords = async (data, user_scheme_id) => {
  try {
    const { planLength, scheme_id, price_per_month } = data?.schemeData;
    const insertQuery = [];
    const startDate = new Date();
    let firstInstallment = undefined;
    for (let installment = 1; installment <= planLength; installment++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(startDate.getMonth() + installment - 1);

      const formattedDate = dueDate.toISOString().split("T")[0];
      const uuid = uuidv4();
      if (installment === 1) {
        firstInstallment = uuid;
      }

      insertQuery.push([
        uuid,
        user_scheme_id,
        installment,
        price_per_month,
        formattedDate,
        "pending",
      ]);
    }
    // console.log(insertQuery);

    const result = await pool.query(scheme_installment_insert, [insertQuery]);
    logger.info(scheme_installment_insert, insertQuery.join(","));
    return {
      status: 1,
      result: "Installment Records Created",
      firstInstallmentId: firstInstallment,
    };
  } catch (err) {
    logger.info(err);
    return { status: 0, result: err };
  }
};

export const MarkInstallmentStatus = async (
  installment_id,
  actionDate,
  status,
) => {
  console.log(installment_id, actionDate, status);
  try {
    if (installment_id === undefined) return false;
    const UpdateInstallmentQuery =
      "Update installments SET paid_date = ? , status = ? WHERE installment_id = ?";

    await pool.query(UpdateInstallmentQuery, [
      actionDate,
      status,
      installment_id,
    ]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const GetAllUserSchemes = async (req, res) => {
  try {
    const { userId } = req.body;
    const [allUserSchemes] = await pool.query(
      "SELECT user_scheme_id , scheme_id from user_schemes WHERE user_id = ?",
      [userId],
    );
    console.log("1");
    if (allUserSchemes.length == 0)
      return res
        .status(200)
        .json({ status: 1, rows: [], message: "No Data Found" });
    console.log("2");

    // console.log(allUserSchemes);
    let allInstallments = {};
    const getInstallmentQuery =
      "SELECT  \
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_count,\
  MAX(CASE WHEN status = 'paid' THEN installment_number END) AS last_installment_number,\
  MAX(CASE WHEN status = 'paid' THEN paid_date END) AS last_paid_date \
FROM installments \
WHERE            user_scheme_id = ?; ";

    const getNextDueDateQuery =
      "SELECT due_date from installments WHERE user_scheme_id = ? and installment_number=?";

    // MAX(CASE WHEN installment_number = 2 THEN due_date END) AS next_due_date\
    for (let i = 0; i < allUserSchemes.length; i++) {
      let data = { completed: false };

      const [installmentResultRow] = await pool.query(getInstallmentQuery, [
        allUserSchemes[i].user_scheme_id,
      ]);

      // console.log(
      //   installmentResultRow,
      //   installmentResultRow[0]?.last_installment_number,
      // );

      if (
        installmentResultRow.length > 0 &&
        installmentResultRow[0]?.last_installment_number !== null
      ) {
        // get Next Due Date
        const [dueDateResult] = await pool.query(getNextDueDateQuery, [
          allUserSchemes[i].user_scheme_id,
          installmentResultRow[0].last_installment_number + 1,
        ]);

        if (dueDateResult.length > 0) {
          data.paid_count = installmentResultRow[0]?.paid_count;
          data.last_paid_date = installmentResultRow[0]?.last_paid_date;
          data.next_due_date = dueDateResult[0]?.due_date;
          data.scheme_id = allUserSchemes[i]?.scheme_id;
        } else {
          // No Pending Due
          // COmpletes Schemes
          data.completed = true;
          data.paid_count = installmentResultRow[0]?.paid_count;
          data.last_paid_date = installmentResultRow[0]?.last_paid_date;
          data.scheme_id = allUserSchemes[i]?.scheme_id;
        }
      }

      allInstallments[allUserSchemes[i].user_scheme_id] = data;
    }

    res.status(200).json({ status: 1, rows: allInstallments });
  } catch (err) {
    logger.info(`GetAllUserSchemes Failed with Exception : ${err}`);
    res.status(500);
  }
};

export const GetUserScheme = async (req, res) => {
  try {
    const { userSchemeId } = req.body;
    const [allUserSchemes] = await pool.query(
      "SELECT user_scheme_id , scheme_id from user_schemes WHERE user_id = ?",
      [userId],
    );

    if (allUserSchemes.length == 0)
      res.status(200).json({ status: 1, rows: [], message: "No Data Found" });

    // console.log(allUserSchemes);
    let allInstallments = {};
    const getInstallmentQuery =
      "SELECT  \
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_count,\
  MAX(CASE WHEN status = 'paid' THEN installment_number END) AS last_installment_number,\
  MAX(CASE WHEN status = 'paid' THEN paid_date END) AS last_paid_date \
FROM installments \
WHERE            user_scheme_id = ?; ";

    const getNextDueDateQuery =
      "SELECT due_date from installments WHERE user_scheme_id = ? and installment_number=?";

    // MAX(CASE WHEN installment_number = 2 THEN due_date END) AS next_due_date\
    for (let i = 0; i < allUserSchemes.length; i++) {
      let data = {};

      const [installmentResultRow] = await pool.query(getInstallmentQuery, [
        allUserSchemes[i].user_scheme_id,
      ]);

      // console.log(
      //   installmentResultRow,
      //   installmentResultRow[0]?.last_installment_number,
      // );

      if (
        installmentResultRow.length > 0 &&
        installmentResultRow[0]?.last_installment_number !== null
      ) {
        // get Next Due Date
        const [dueDateResult] = await pool.query(getNextDueDateQuery, [
          allUserSchemes[i].user_scheme_id,
          installmentResultRow[0].last_installment_number + 1,
        ]);

        if (dueDateResult.length > 0) {
          data.paid_count = installmentResultRow[0]?.paid_count;
          data.last_paid_date = installmentResultRow[0]?.last_paid_date;
          data.next_due_date = dueDateResult[0]?.due_date;
          data.scheme_id = allUserSchemes[i]?.scheme_id;
        }
      }

      allInstallments[allUserSchemes[i].user_scheme_id] = data;
    }

    res.status(200).json({ status: 1, rows: allInstallments });
  } catch (err) {
    logger.info(`GetUserScheme Failed with Exception : ${err}`);
    res.status(500);
  }
};

export const GetAllInstallmentsHistory = async (req, res) => {
  try {
    const { userSchemeId } = req.body;
    const GetInstallmentsQuery =
      "SELECT installment_id, installment_number , due_date , paid_date , status , amount FROM installments WHERE user_scheme_id = ? ORDER BY installment_number asc;";
    const [rows] = await pool.query(GetInstallmentsQuery, [userSchemeId]);

    if (rows.length == 0) res.status(200).json({ status: 1, rows: [] });

    res.status(200).json({ status: 1, rows: rows });
  } catch (err) {
    logger.info("GetAllInstallmentsHistory error : ", err);
    res.status(500);
  }
};
