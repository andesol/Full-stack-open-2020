import React from 'react'

import Part from './Part'
import Total from './Total.js'

const Content = ({course}) => {
    console.log(course)
    console.log(course.parts)

    return (
        <div>
            {course.parts.map( part => {
                return (
                <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
            )}
            <Total parts={course.parts} />
        </div>
    )
  }

export default Content