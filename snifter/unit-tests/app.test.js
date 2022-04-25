import { mount, shallowMount } from "@vue/test-utils";
import App from "./../src/App.vue";
import Home from "./../src/views/Home.vue";
import Browse from "./../src/views/Browse.vue";
import About from "./../src/views/About.vue";
import NFT from "./../src/views/Nft.vue";
import Tweets from "./../src/views/Tweets.vue";
import Wiki from "./../src/views/Wiki.vue";
import Search from "./../src/views/Search.vue";
//import User from "./../src/views/User.vue";

describe("App", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof App.data).toBe("function");
  });

  describe("Mounted App", () => {
    const wrapper = mount(App);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});

describe("Home.vue", () => {
  it("renders h2 tag", () => {
    const wrapper = mount(Home)
    const h2 = wrapper.find("h2")
    expect(h2.text()).toBe("Welcome to sNiFTer");
  });

  describe("Mounted Home", () => {
    const wrapper = mount(Home);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});

describe("About.vue", () => {
  it("renders div", () => {
    const wrapper = mount(About)
    const div = wrapper.find("div")
    expect(div.exists()).toBe(true);
  });

  describe("Mounted About", () => {
    const wrapper = mount(About);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});

describe("Browse.vue", () => {
  it("h2 color", () => {
    const wrapper = mount(Browse)
    const h2 = wrapper.find("h2")
    expect(h2.attributes().style).toBe("color: white;")
  });

  describe("Mounted Browse", () => {
    const wrapper = mount(Browse);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});
/*
describe("NFT.vue", () => {
  it("has data", () => {  
    expect(typeof NFT.data).toBe("function");
  });
  describe("Mounted NFT", () => {
    const wrapper = mount(NFT);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});
*/
describe("Tweets.vue", () => {
  it("h2 exsists", () => {
    const wrapper = mount(Tweets)
    const h2 = wrapper.find("h2")
    expect(h2.exists()).toBe(true)
  });

  describe("Mounted Tweets", () => {
    const wrapper = mount(Tweets);

    test("does a wrapper exist", () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});

describe("Wiki.vue", () => {
  it("has data", () => {
    expect(typeof Wiki.data).toBe("function");
  });
});

describe("Search.vue", () => {
  it("has data", () => {
    expect(typeof Search.data).toBe("function");
  });
  
  it("h2 exsists", () => {
    const wrapper = mount(Search)
    const h2 = wrapper.find("h2")
    expect(h2.text()).toBe("Feeling nosey?")
  });
});