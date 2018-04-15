import { STObject } from "./STObject";
import { STMessage } from "./STMessage";
import { STNil } from "./STNil";
import { STInstance } from "./STInstance";
import { STSelector } from "./STSelector";

/**
 * A Smalltalk class.
 */
export class STClass extends STObject {
	private fieldNames: string[];
	private classMethods: { [selector: string] : () => STObject; } = {};
	private instanceMethods: { [selector: string] : (STObject) => STObject; } = {};

	// Override
	public receiveMessage(message: STMessage): STObject {
		let selector: string = message.getSelector().value;

		if (selector in this.classMethods) {
			return this.classMethods[selector]();
		}

		switch (selector) {
		case "new":
			return new STInstance(this);
		case "setMethod:to":
			// TODO
		case "setClassMethod:to":
			// TODO
		case "declareProperty":
			// TODO
		}

		return STNil.get();
	}

	public 

	public receiveInstanceMessage(instance: STInstance, message: STMessage): STObject {
		let selector: string = message.getSelector().value;

		if (selector in this.instanceMethods) {
			// Call instance method using instance
			return this.instanceMethods[selector](instance);
		} else {
			return STNil.get();
		}
	}
}