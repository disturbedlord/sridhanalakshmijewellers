export function formatString(template, ...values) {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof values[index] !== "undefined" ? values[index] : match;
  });
}

export const user_devices_insert = `INSERT INTO user_devices (
  id, user_id, device_id, device_name, platform, app_version, build_number,
  refresh_token_hash, refresh_token_expires_at, last_used_at, is_active
)
VALUES (
  UUID(), ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE
)
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  platform = VALUES(platform),
  app_version = VALUES(app_version),
  build_number = VALUES(build_number),
  refresh_token_hash = VALUES(refresh_token_hash),
  refresh_token_expires_at = VALUES(refresh_token_expires_at),
  last_used_at = NOW(),
  is_active = TRUE;`;

export const user_schemes_insert = `INSERT INTO user_schemes (
  user_scheme_id,
  user_id,
  scheme_id,
  start_date,
  maturity_date,
  status
)
VALUES (
 ?,
  ?,
  ?,
  ?,
  ?,
  ?
);`;

export const scheme_installment_insert = `
INSERT INTO installments
(installment_id,user_scheme_id,installment_number,amount,due_date,status)
VALUES ?`;

// ('i-0001','11111111-1111-1111-1111-111111111111',1,500,'2026-03-01','pending'),`

export const razorpay_create_order = `INSERT INTO payments (
  payment_id,
  installment_id,
  razorpay_order_id,
  amount,
  status
)
VALUES (
  ?,
  ?,
  ?,
  ?,
  ?
);`;

export const razorpay_success_payment = `INSERT INTO payments (
  payment_id,
  installment_id,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount,
  status
)
VALUES (
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  'success'
);`;

export const razorpay_failed_payment = `INSERT INTO payments (
  payment_id,
  installment_id,
  razorpay_order_id,
  amount,
  status
)
VALUES (
  ?,
  ?,
  ?,
 ?,
  'failed'
);`;

export const razorpay_refunded_payment = `INSERT INTO payments (
  payment_id,
  installment_id,
  razorpay_order_id,
  razorpay_payment_id,
  amount,
  status
)
VALUES (
  ?,
  ?,
  ?,
  ?,
  ?,
  'refunded'
);`;
