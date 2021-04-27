import Service from './service';

class RidingRecordService extends Service {
  constructor() {
    super('riding_record');
  }

  /**
   * 添加骑行记录
   * @return {Promise<boolean>}
   */
  async addRecord() {}
}

const ridingRecordService = new RidingRecordService();
export default ridingRecordService;
