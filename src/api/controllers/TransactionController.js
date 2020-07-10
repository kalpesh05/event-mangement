const { TransactionService, UserService } = require("../../services");
const { omit } = require("lodash");
class transactionController {
  /**
   * Create Transaction
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    try {
      let body = req.body;

      let transactions = await TransactionService.create(body);

      return res.json({
        data: transactions
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get All Transaction
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllTransactions(req, res, next) {
    let { search_text, page, limit } = req.query;
    try {
      limit = limit ? JSON.parse(limit) : limit;
      page = page ? page : 1;
      let skip = limit * page - limit;
      let query = search_text
        ? {
            $or: [
              { _id: search_text },
              { from: search_text },
              { to: search_text },
              { hash: search_text }
            ]
          }
        : {};
      const transactions = await TransactionService.getAllTransactionsWhere(
        query,
        limit,
        skip
      );

      return res.json({
        data: transactions
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Fetch User Transactions
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async fetchMyTransactions(req, res, next) {
    let { _id, public_key } = req.user;
    let { search_text, page, limit } = req.query;
    try {
      const users = await UserService.getOne(_id);
      limit = limit ? JSON.parse(limit) : limit;
      page = page ? page : 1;
      let skip = limit ? limit * page - limit : 0;
      let query = search_text
        ? {
            $and: [
              { $or: [{ to: public_key }, { from: public_key }] },
              {
                $or: [
                  { _id: search_text },
                  { from: search_text },
                  { to: search_text },
                  { hash: search_text }
                ]
              }
            ]
          }
        : {
            $or: [{ to: public_key }, { from: public_key }]
          };
      const transactions = await TransactionService.getAllTransactionsWhere(
        query,
        limit,
        skip
      );

      return res.json({
        data: transactions
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new transactionController();
