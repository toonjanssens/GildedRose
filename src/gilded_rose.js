class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Rule {
  constructor(condition, action) {
    this.condition = condition;
    this.action = action;
  }

  isApplicable(item) {
    return this.condition(item);
  }

  apply(item) {
    return this.action(item);
  }
}

class NameRule extends Rule {
  isApplicable(item) {
    return item.name === this.condition;
  }
}

class RuleManager {
  constructor(rules, guard) {
    this.rules = rules;
    this.guards = guard;
  }

  apply(item) {
    return this.applyGuards(this.applyRules(item));
  }

  applyRules(item) {
    for(let i = 0; this.rules.length; i++) {
      const rule = this.rules[i];
      if (rule.isApplicable(item)) {
        return rule.apply(item);
      }
    };

    return item;
  }

  applyGuards(item) {
    this.guards.forEach(guard => {
      item = guard(item);
    });

    return item;
  }
}

const agedBrieRule = new NameRule(
  'Aged Brie', 
  (item) => {
    item.quality++; 

    return item;
  }
);

const sulfurasRule = new NameRule(
  'Sulfuras, Hand of Ragnaros',
  (item) => item
);

const backstageTicketRule = new NameRule(
  'Backstage passes to a TAFKAL80ETC concert',
  (item) => {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality = item.quality + 3;
    } else if (item.sellIn <= 10) {
      item.quality = item.quality + 2;
    }

    return item;
  }
);

const sellPassedRule = new Rule((item) => item.sellIn <= 0, (item) => {
  item.quality = item.quality - 2;

  return item;
});

const baseRule = new Rule(() => true, (item) => {
  item.sellIn--; 
  item.quality--;

  return item;
});

const qualityGuard = (item) => {
  if (item.quality < 0) {
    item.quality = 0;
  }
  if (item.quality > 50) {
    item.quality = 50;
  }
  return item;
}

const rulesManager = new RuleManager(
  [
    agedBrieRule, 
    sulfurasRule, 
    backstageTicketRule, 
    sellPassedRule, 
    baseRule
  ], [
    qualityGuard
  ]
);

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items = this.items.map(item => {
      return rulesManager.apply(item);
      
    });
   
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
