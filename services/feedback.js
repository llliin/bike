import Service from './service';
import FeedbackModel from './model/feedback.model';
import bikeService from './bike';

class FeedbackService extends Service {
  constructor() {
    super('feedback');
  }

  /**
   * 创建反馈
   * @param type {string} 类型
   * @param no {string} 单车编号
   * @param isBreak {boolean} 是否报修
   * @param content {string} 内容
   * @return {Promise<FeedbackModel>}
   */
  async create(type, no, isBreak, content = '') {
    const model = new FeedbackModel();
    model.isBreak = isBreak;
    model.no = no;
    model.type = type;
    model.content = content;
    const c = await this.collection.add({ data: model.create() });
    model._id = c._id;
    return model && (await bikeService.bikeBroken(no));
  }
}

const feedbackService = new FeedbackService();
export default feedbackService;
