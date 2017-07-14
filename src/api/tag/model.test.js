import { Tag } from '.'
import { User } from '../user'

let user, tag

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  tag = await Tag.create({ creator: user, label: 'test', url: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tag.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.label).toBe(tag.label)
    expect(view.url).toBe(tag.url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tag.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.label).toBe(tag.label)
    expect(view.url).toBe(tag.url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
