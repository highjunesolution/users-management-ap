const registerNotifyEmail = (data) => {
  const skillTags = data.skills
    ? data.skills
        .split(",")
        .map(
          (s) =>
            `<span style="display:inline-block;background:#dcfce7;color:#166534;font-size:12px;padding:3px 10px;border-radius:20px;margin:3px;">${s.trim()}</span>`,
        )
        .join("")
    : "";

  const avatarLetter = data.firstName ? data.firstName.charAt(0) : "U";
  const avatarColor = data.avatar || "#3b82f6";

  return `
<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ยินดีต้อนรับสู่ IT System</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #f3f4f6;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background: #f3f4f6; padding: 40px 0"
    >
      <tr>
        <td align="center">
          <table
            width="560"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid #e5e7eb;
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #ff4713;
                  padding: 32px 40px;
                  text-align: center;
                "
              >
                <div
                  style="
                    display: inline-block;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 1);
                    line-height: 70px;
                    margin-bottom: 14px;
                  "
                >
                  <img
                    style="width: 60px; height: 60px; vertical-align: middle"
                    src="https://brandlogos.net/wp-content/uploads/2022/05/maxxis-logo_brandlogos.net_70afh.png"
                    alt="Company Logo"
                  />
                </div>
                <h1
                  style="
                    margin: 0 0 4px;
                    font-size: 22px;
                    font-weight: 700;
                    color: #ffffff;
                  "
                >
                  ยินดีต้อนรับสู่ IT System
                </h1>
                <p
                  style="
                    margin: 0;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.75);
                  "
                >
                  บัญชีของคุณถูกสร้างเรียบร้อยแล้ว
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px 40px">
                <!-- Avatar + Name -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="margin-bottom: 24px"
                >
                  <tr>
                    <td style="vertical-align: middle">
                      <div
                        style="width:48px;height:48px;border-radius:50%;
                      background:${avatarColor};text-align:center;line-height:48px;
                      font-size:20px;font-weight:700;color:#fff;"
                      >
                        ${avatarLetter}
                      </div>
                    </td>
                    <td style="padding-left: 14px; vertical-align: middle">
                      <p
                        style="
                          margin: 0;
                          font-size: 18px;
                          font-weight: 700;
                          color: #1a1a1a;
                        "
                      >
                        สวัสดี, ${data.firstName} ${data.lastName}!
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #6b7280">
                        @${data.username || ""} &nbsp;·&nbsp; ${
                          data.jobType || ""
                        }
                      </p>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 0 0 24px;
                    font-size: 14px;
                    color: #4b5563;
                    line-height: 1.7;
                  "
                >
                  ขอบคุณที่ลงทะเบียนกับ IT System
                  บัญชีของคุณได้รับการสร้างเรียบร้อยแล้ว
                  ด้านล่างนี้คือข้อมูลบัญชีของคุณ
                </p>

                <!-- Personal Info -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background: #f8faff;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    border: 1px solid #dbeafe;
                  "
                >
                  <tr>
                    <td colspan="2" style="padding-bottom: 14px">
                      <span
                        style="
                          font-size: 13px;
                          font-weight: 600;
                          color: #1e40af;
                          text-transform: uppercase;
                          letter-spacing: 0.05em;
                        "
                      >
                        ข้อมูลส่วนตัว
                      </span>
                    </td>
                  </tr>
                  ${[
                    ["ชื่อ-นามสกุล", `${data.firstName} ${data.lastName}`],
                    ["อีเมล", data.email],
                    ["เบอร์โทร", data.phone],
                    ["เพศ", data.gender],
                    ["สัญชาติ", data.nationality],
                    ["จังหวัด", data.province],
                  ]
                    .map(
                      ([label, value]) => `
                  <tr>
                    <td
                      style="
                        padding: 5px 0;
                        font-size: 13px;
                        color: #6b7280;
                        width: 40%;
                      "
                    >
                      ${label}
                    </td>
                    <td
                      style="
                        padding: 5px 0;
                        font-size: 13px;
                        color: #1a1a1a;
                        font-weight: 500;
                      "
                    >
                      ${value || "-"}
                    </td>
                  </tr>
                  `,
                    )
                    .join("")}
                </table>

                <!-- Education & Skills -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background: #f0fdf4;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 24px;
                    border: 1px solid #bbf7d0;
                  "
                >
                  <tr>
                    <td colspan="2" style="padding-bottom: 14px">
                      <span
                        style="
                          font-size: 13px;
                          font-weight: 600;
                          color: #15803d;
                          text-transform: uppercase;
                          letter-spacing: 0.05em;
                        "
                      >
                        ข้อมูลการศึกษา &amp; ทักษะ
                      </span>
                    </td>
                  </tr>
                  ${[
                    ["ระดับการศึกษา", data.education],
                    ["สาขา", data.major],
                    ["มหาวิทยาลัย", data.school],
                    ["เกรดเฉลี่ย", data.gpa],
                  ]
                    .map(
                      ([label, value]) => `
                  <tr>
                    <td
                      style="
                        padding: 5px 0;
                        font-size: 13px;
                        color: #6b7280;
                        width: 40%;
                      "
                    >
                      ${label}
                    </td>
                    <td style="padding: 5px 0; font-size: 13px; color: #1a1a1a">
                      ${value || "-"}
                    </td>
                  </tr>
                  `,
                    )
                    .join("")}
                  <tr>
                    <td
                      colspan="2"
                      style="padding-top: 12px; border-top: 1px solid #bbf7d0"
                    >
                      <p
                        style="margin: 0 0 8px; font-size: 13px; color: #6b7280"
                      >
                        ทักษะ
                      </p>
                      <div>${skillTags}</div>
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a
                        href="http://127.0.0.1:5500/"
                        style="
                          display: inline-block;
                          padding: 13px 36px;
                          background: #1e40af;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        เข้าสู่ระบบ
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background: #f9fafb;
                  padding: 20px 40px;
                  border-top: 1px solid #e5e7eb;
                  text-align: center;
                "
              >
                <p style="margin: 0; font-size: 12px; color: #9ca3af">
                  IT System &nbsp;·&nbsp; ส่งโดยอัตโนมัติ
                  กรุณาอย่าตอบกลับอีเมลฉบับนี้
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

module.exports = { registerNotifyEmail };
