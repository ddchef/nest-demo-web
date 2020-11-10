export default class EventBus {
  registeredEvents={}
  on (eventName, callback) {
    this.registeredEvents[eventName] = callback
  }

  emit (eventName, args) {
    if (this.registeredEvents[eventName]) {
      this.registeredEvents[eventName](args)
    }
  }
}
