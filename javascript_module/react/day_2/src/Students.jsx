import React from 'react'

const Students = (props) => {
    console.log(typeof(props));
    const StudentsList = props.students;

  return (
    <React.Fragment>
        <div style={{"max-width": '1200px', "margin": 'auto'}}>
            {/* Inside the curly braces in a React Fragment, you must return a JSX element */}
            {
                StudentsList.map((student, idx) => {
                    // Return jsx element
                    return (
                    <div key={idx}>
                        <p style = {{ 'text-align': 'center' }}>=========== Học sinh {idx + 1} =============</p>
                        <p style = {{ 'text-align': 'center' }}>ID:{student.id}</p>
                        <p style = {{ 'text-align': 'center' }}>Tuổi:{student.age}</p>
                        <p style = {{ 'text-align': 'center' }}>Học và tên:{student.name}</p>
                    </div>
                    )
                })
            }
            <div style = {{ 'text-align': 'center' }}>~~~~~~~~~~~~~~~~~~~~~~~~</div>
            <div style = {{ 'text-align': 'center' }}>
                <strong>
                    Học sinh nữ và có số điểm chẵn
                </strong>
            </div>
            {
                StudentsList.map((student, idx) => {
                    if (student.gender == "female" && student.score % 2 == 0) {
                        return (
                        <div key={idx}>
                            <div style = {{ 'text-align': 'center' }}>=========== Học sinh {idx + 1} =============</div>
                            <div style = {{ 'text-align': 'center' }}>ID:{student.id}</div>
                            <div style = {{ 'text-align': 'center' }}>Tuổi:{student.age}</div>
                            <div style = {{ 'text-align': 'center' }}>Học và tên:{student.name}</div>
                            <div style = {{ 'text-align': 'center' }}>Giới tính:{student.gender}</div>
                            <div style = {{ 'text-align': 'center' }}>Điểm:{student.score}</div>
                        </div>
                        )
                    }
                })
            }
        </div>
    </React.Fragment>
  )
}

export default Students;
