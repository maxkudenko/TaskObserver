class Observer {

  constructor() {
    this._observers = [];
  }

  subscribe(callback) {
    this._observers.push(callback);
  }

  unsubscribe(callback) {
    this._observers = this._observers.filter( (observer) => observer !== callback );
    // let indexOfObserver = this._observers.indexOf(callback);
    // if(indexOfObserver) {
    //   this._observers.splice(indexOfObserver, 1);
    // }
  }

  once(callback) {
    callback.flag = true;
    this._observers.push(callback);
  }

  broadcast(data) {
    this._observers.forEach((observer) => {
      observer(data);
      if(observer.flag) {
        this.unsubscribe(observer);
      }
    })
  }

  broadcastRandom(data) {
    this._observers.forEach((observer) => {
      let int = Math.random() * 100 / 10;
      if(int <= 5) {
        observer(data);
        if(observer.flag) {
          this.unsubscribe(observer);
        }
      }
    })
  }

}

class User {

  constructor(name) {
    this.name = name;
    this.showNews = this.showNews.bind(this);
  }

  showNews(data) {
    console.log(`${this.name} ${data}`);
  }

}

class News {

  constructor(name) {
    this.name = name;
  }

  generateNews() {
    return `${this.name} ${Math.random() * 100000000}`;
  }

}

const observer = new Observer();

const user1 = new User('Vasya');
const user2 = new User('Petya');
const user3 = new User('Kolya');
const user4 = new User('Masha');

const news = new News('Exchange');

observer.subscribe(user1.showNews);
observer.once(user2.showNews);
observer.subscribe(user3.showNews);
observer.subscribe(user4.showNews);


observer.broadcastRandom(news.generateNews());

observer.broadcast(news.generateNews());

observer.unsubscribe(user3.showNews);

observer.broadcast(news.generateNews());

observer.unsubscribe(user4.showNews);

observer.broadcast(news.generateNews());




