import { noticeCreatorJob } from './notice-creator';
import { updateGroupQrJob } from './update-group-qr';

noticeCreatorJob.start();
updateGroupQrJob.start();
