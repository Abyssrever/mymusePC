#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: String) -> String {
    println!("后端收到了消息: {}", name);
    format!("{}", name)
}

fn main() {
    tauri::Builder::default()
    .plugin(tauri_plugin_process::init())   
    .plugin(tauri_plugin_window_state::Builder::new().build())
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("启动 Tauri 应用时出错");

}
