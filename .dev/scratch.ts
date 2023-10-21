{
  /* {form.watch().sections.map((section, i) => {
      return (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre suppressHydrationWarning>
              type: {section.type}
              <br />
              {section.entries.map((e, j) => (
                <pre key={j} suppressHydrationWarning>
                  {Object.keys(e).map((field, k) => {
                    return (
                      <pre key={k} suppressHydrationWarning>
                        {JSON.stringify(field, null, 2)}
                        <br />
                      </pre>
                    );
                  })}
                  <br />
                </pre>
              ))}
              <br />
            </pre>
          </CardContent>
        </Card>
      );
    })} */
}
// return (
//   <>
//     <pre suppressHydrationWarning>{JSON.stringify(contactInfo, null, 2)}</pre>
//     <Card>
//       <CardHeader>
//         <CardTitle>Personal Information</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               placeholder="john.doe@example.com"
//               value={contactInfo.email}
//               onChange={(e) => update("contactInfo.email", e.target.value)}
//               required
//               type="email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               placeholder="123-456-7890"
//               required
//               type="tel"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="address">Address</Label>
//             <Input
//               id="address"
//               placeholder="123 Main Street, Town, Country"
//               required
//             />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//     <pre suppressHydrationWarning>{JSON.stringify(sections[0], null, 2)}</pre>
//     <Card>
//       <CardHeader>
//         <CardTitle>Work Experience</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="company">Company</Label>
//               <Input id="company" placeholder="Tech Company Inc." required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="position">Position</Label>
//               <Input id="position" placeholder="Software Engineer" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="duration">Duration</Label>
//               <Input id="duration" placeholder="2 years" required />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//     <pre suppressHydrationWarning>{JSON.stringify(sections[1], null, 2)}</pre>
//     <Card>
//       <CardHeader>
//         <CardTitle>Education</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="university">University</Label>
//               <Input
//                 id="university"
//                 placeholder="Harvard University"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="degree">Degree</Label>
//               <Input
//                 id="degree"
//                 placeholder="Bachelor of Science in Computer Science"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="graduation">Graduation Year</Label>
//               <Input
//                 id="graduation"
//                 max="2023"
//                 min="1950"
//                 placeholder="2023"
//                 required
//                 type="number"
//               />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//     <pre suppressHydrationWarning>{JSON.stringify(sections[2], null, 2)}</pre>
//     <Card>
//       <CardHeader>
//         <CardTitle>Skills</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="programming">Programming</Label>
//               <Checkbox id="programming" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="analysis">Analysis</Label>
//               <Checkbox id="analysis" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="teamwork">Teamwork</Label>
//               <Checkbox id="teamwork" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="newSkill">Add Skill</Label>
//               <Input id="newSkill" placeholder="New Skill" />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//     <pre suppressHydrationWarning>{JSON.stringify(sections[3], null, 2)}</pre>
//     <Button className="w-full" type="submit">
//       Generate Resume
//     </Button>
//   </>
// );
