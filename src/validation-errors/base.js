import { getMetaFromPath, getDecoratedDataPath } from '../json';

export default class BaseValidationError {
  constructor(
    options = { isIdentifierLocation: false },
    { data, schema, jsonAst, jsonRaw }
  ) {
    this.options = options;
    this.data = data;
    this.schema = schema;
    this.jsonAst = jsonAst;
    this.jsonRaw = jsonRaw;
  }

  getLocation(dataPath = this.options.dataPath) {
    const { isIdentifierLocation, isSkipEndLocation } = this.options;
    const { loc } = getMetaFromPath(
      this.jsonAst,
      dataPath,
      isIdentifierLocation
    );
    return {
      start: loc.start,
      end: isSkipEndLocation ? undefined : loc.end,
    };
  }

  getDecoratedPath(dataPath = this.options.dataPath) {
    const decoratedPath = getDecoratedDataPath(this.jsonAst, dataPath);
    return decoratedPath;
  }

  getError() {
    throw new Error(
      `Implement the 'getError' method inside ${this.constructor.name}!`
    );
  }
}
