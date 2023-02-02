const path = require("path");
const fs = require("fs");
/**
 * @apidoc
 * @api {get} api/test 测试
 * @apiName 测试
 * @apiGroup 测试
 * @apiVersion 0.0.1
 * @apiDescription 测试
 * @apiSampleRequest /test
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 信息
 * @apiSuccess {Object} data 数据
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "code": "200",
 *   "msg": "成功",
 *  "data": {}
 * }
 * @apiError {String} code 状态码
 * @apiError {String} msg 信息
 * @apiError {Object} data 数据
 * @apiErrorExample {json} Error-Response:
 * {
 *   "code": "500",
 *  "msg": "失败",q
 * "data": {}
 * }
 * @apiParamExample {json} Request-Example:
 * {
 * }
 * @apiParam {String} name 名称
 * @apiParam {String} password 密码
 * @apiParam {String} phone 手机号
 * @apiParam {String} email 邮箱
 * @apiParam {String} code 验证码
 *
 * @apiParamExample {json} Request-Example:
 * {
 * name: "admin",
 * password: "123456",
 * phone: "12345678901",
 * email: "",
 * code: "123456"
 * }
 * @apiSampleRequest /api/test
 */
exports.test = async (req, res) => {
  const methods = req.method;
  let msg = "成功";
  if (methods === "GET") {
    msg = "GET请求成功";
  }
  if (methods === "POST") {
    msg = "POST请求成功";
  }
  return res.json({ msg: msg });
};
