import BaseModel from './base.model';

/**
 * 反馈模型
 */
export default class FeedbackModel extends BaseModel {
  /**
   * 时间
   * @type {Date}
   */
  time = new Date();

  /**
   * 是否为报故障
   * @type {boolean}
   */
  isBreak = false;

  /**
   * 反馈类型
   * @type {string}
   */
  type = '';

  /**
   * 单车编号
   * @type {string}
   */
  no = null;

  /**
   * 反馈内容
   * @type {string}
   */
  content = '';
}
