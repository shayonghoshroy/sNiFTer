import { isTargetNameAssociation } from '@aws-amplify/datastore';
import { mount } from '@vue/test-utils'
import TwitterSearchComponent from '../src/components/TwitterSearchComponent.vue'

describe('Tweet.test.js', () => {
    let cmp

    beforeEach(() => {
        cmp = mount(TwitterSearchComponent, {
            data() {
                return {
                keywordTweets: "testOne",
                keywordUser: "testTwo",
                searchIndex: 2,
                requestCount: 1,
                tweets: [],
                twitterUsers: ["userONe", "Bored Ape Yacht Club", "shayon"],
                }
            }
        })
    });

    it("got keyWord tweets", () => {
        expect(cmp.vm.keywordTweets).toEqual("testOne")
    })

    it("got keyWord User", () => {
        expect(cmp.vm.keywordUser).toEqual("testTwo")
    })

    it("got search index", () => {
        expect(cmp.vm.searchIndex).toEqual(2)
    })

    it("got request count", () => {
        expect(cmp.vm.requestCount).toEqual(1)
    })

    it("got empty tweet array", () => {
        expect(cmp.vm.tweets).toEqual([])
    })

    it("got filled twitterUsers", () => {
        expect(cmp.vm.twitterUsers).toEqual(["userONe", "Bored Ape Yacht Club", "shayon"])
    })
})