import { mount } from '@vue/test-utils'
import Comment from '../src/components/comment/Comment.vue'

// test component by mounting it with a fake data object

describe('Comment.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(Comment, {
      propsData: {
        id: 1,
        sender: "shyguy",
        message: "I am a comment.",
        collection: '0x79fcdef22feed20eddacbb2587640e45491b757f',
        nft_id: '0x79fcdef22feed20eddacbb2587640e45491b757f-9973',
        nft_rating: 10,
        likes: 0,
        user: "shyguy",
        isStatic: false,
      }
    })
  })

  // check if the component has expected data

  it('got comment id', () => {
    expect(cmp.vm.id).toEqual(1)
  })

  it('got comment sender', () => {
    expect(cmp.vm.sender).toEqual("shyguy")
  })

  it('got comment message', () => {
    expect(cmp.vm.message).toEqual("I am a comment.")
  })

  it('got comment collection', () => {
    expect(cmp.vm.collection).toEqual('0x79fcdef22feed20eddacbb2587640e45491b757f')
  })

  it('got comment nft_id', () => {
    expect(cmp.vm.nft_id).toEqual('0x79fcdef22feed20eddacbb2587640e45491b757f-9973')
  })

  it('got comment nft_rating', () => {
    expect(cmp.vm.nft_rating).toEqual(10)
  })

  it('got comment likes', () => {
    expect(cmp.vm.likes).toEqual(0)
  })

  it('got comment user', () => {
    expect(cmp.vm.user).toEqual("shyguy")
  })

  it('got comment isStatic', () => {
    expect(cmp.vm.isStatic).toEqual(false)
  })

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
