import Identifier from './Identifier';
import Create from './Create';
import Rename from './Rename';
import Remove from './Remove';

const modalsMapping = {
  identification: Identifier,
  create: Create,
  rename: Rename,
  remove: Remove,
};

export default (type) => modalsMapping[type];
