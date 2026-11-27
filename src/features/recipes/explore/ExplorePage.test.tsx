import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExplorePage from './ExplorePage'

describe('ExplorePage', () => {
  it('서비스 이름을 제목으로 보여준다', () => {
    render(<ExplorePage />)

    expect(screen.getByRole('heading', { name: 'CUSFIT' })).toBeInTheDocument()
  })
})
