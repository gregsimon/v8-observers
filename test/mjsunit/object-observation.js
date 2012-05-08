// Copyright 2012 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Test Object observation
(function() {

  function MyObject() {
    this.a = "a"; // the property we'll be mutating
  }

  function printAllRecords(records) {
    for (var i = 0; i < records.length; ++i) {
      r = records[i];
      print("  [" + i + "] { name=" + r.name + " type=" + r.type + 
                " object=\"" + r.object.debugName + "\" }");
    }
  }

  function observerCallback1(records) {
    print(" -- callback1 ");
    printAllRecords(records);
  }
  function observerCallback2(records) {
    print(" -- callback2 ");
    printAllRecords(records);
  }

  var target1 = new MyObject();
  target1.debugName = "target1";

  var target2 = new MyObject();
  target2.debugName = "target2";
  
  // Observe the objects.
  Object.observe(target1, observerCallback1);
  Object.observe(target2, observerCallback2);

  target1.a = "b";

  target2.a = "c";
  target2.a = "d";
  
  target1.a = "e";
  target1.a = "f";

})();

print("done.")

