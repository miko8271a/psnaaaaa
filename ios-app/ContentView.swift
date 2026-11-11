import SwiftUI

private let sonySignInURL = URL(string: "https://my.account.sony.com/sonyacct/signin/")!

struct ContentView: View {
    @State private var showSignIn = false

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 20) {
                Text("PSN Proxy Login")
                    .font(.title2.bold())
                Text(
                    "Set your HTTP proxy under Settings → Wi‑Fi → Configure Proxy → Manual, then open Sony sign-in below."
                )
                .foregroundStyle(.secondary)
                .font(.body)

                Button("Sign in to PSN") {
                    showSignIn = true
                }
                .buttonStyle(.borderedProminent)
                .frame(maxWidth: .infinity)

                Spacer()
            }
            .padding()
            .navigationTitle("PSN")
            .sheet(isPresented: $showSignIn) {
                NavigationStack {
                    SonySignInWebView(url: sonySignInURL)
                        .ignoresSafeArea(edges: .bottom)
                        .toolbar {
                            ToolbarItem(placement: .cancellationAction) {
                                Button("Done") { showSignIn = false }
                            }
                        }
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
