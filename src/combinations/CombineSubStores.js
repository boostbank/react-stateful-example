import { createSubStore } from "@boostbank/stateful/lib/substore";

export default function combineSubStores() {
  createSubStore("input", {}); // Default no depth. (No version keeping)
}
