const createTimer = (time) => {
  return {
    leftTime: time,
    isActive: true,
    tick() {
      this.leftTime--;
      if (!this.leftTime) {
        this.isActive = false;
      }
    }
  };
};

export default createTimer;
