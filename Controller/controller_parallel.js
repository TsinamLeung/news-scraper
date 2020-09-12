class manager {
  constructor(resourceLimit = 2) {
    this.resourceLimit = resourceLimit
    this.running = 0
  }
  async getResource(waitDelay = 3000, waitTimes = 10) {
    let triedTimes = 0
    while (this.running + 1 > this.resourceLimit) {
      triedTimes += 1
      await this.delay(waitDelay)
      if (triedTimes > waitTimes) {
        return false
      }
    }
    this.running += 1
    return true
  }
  releaseResource() {
    this.running -= 1
    return this.running
  }
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
module.exports = manager