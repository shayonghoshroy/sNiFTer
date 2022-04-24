import { mount } from '@vue/test-utils'
import Nav from '../src/components/partials/Nav.vue'

// test component by mounting it with a fake data object

describe('Nav.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(Nav, {
      propsData: {
        user: ['shyguy']
      }
    });
  })

  // user is not authenticated, so the nav should have empty user data
  
  it('current user has no username', () => {
    expect(cmp.vm.store.user).toEqual(undefined)
  })

  it('user is not logged in', () => {
    expect(cmp.vm.store.isLoggedIn).toEqual(false)
  })

  it('user has no profile picture', () => {
    expect(cmp.vm.src).toEqual(null)
  })

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
