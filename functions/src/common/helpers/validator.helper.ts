import { validateOrReject, ValidationError } from "class-validator-multi-lang";
import { BadRequest } from "../errors/general.error";

export class Validator {
  public static async validate(object: Object): Promise<void> {
    try {
      await validateOrReject(object, { validationError: { target: false } });
    } catch (errors) {
      let errorsMessage: string = this.getMessages(errors);

      throw new BadRequest("bad Request " + errorsMessage);
    }
  }

  public static async validatePartial(object: Object): Promise<void> {
    try {
      await validateOrReject(object, {
        skipUndefinedProperties: true,
        skipNullProperties: true,
        validationError: { target: false },
      });
    } catch (errors) {
      let errorsMessage: string = this.getMessages(errors);

      throw new BadRequest("bad Request " + errorsMessage);
    }
  }

  private static getMessages(errors: ValidationError[]): string {
    let stringError: string = "";
    errors.map((error) => {
      stringError += Object.values(error.constraints).join(",") + " ";
    });

    return stringError;
  }
}
