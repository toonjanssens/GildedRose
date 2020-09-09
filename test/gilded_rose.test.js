const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("SellIn should be decressed by one", function() {
    const gildedRose = new Shop([new Item("Normal item", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("Quality should be decressed by one", function() {
    const gildedRose = new Shop([new Item("Normal item", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([new Item("Item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("The Quality of an item is never negative", function() {
    const gildedRose = new Shop([new Item("Item", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  
  it("'Aged Brie' actually increases in Quality the older it gets", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });
  
  it("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
  
  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', Quality increases by 2 when there are 10 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', Quality increases by 3 when there are 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it("'Backstage passes to a TAFKAL80ETC concert', Quality drops to 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  
  it("'Conjured' items degrade in Quality twice as fast as normal items", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

});

