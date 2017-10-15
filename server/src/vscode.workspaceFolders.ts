export * from 'vscode-languageserver';
import * as vscode from 'vscode-languageserver';
import {_} from 'vscode-languageserver';

export interface WorkspaceFolder {
	/**
	 * The associated URI for this workspace folder.
	 */
    uri: string;

	/**
	 * The name of the workspace folder. Defaults to the
	 * uri's basename.
	 */
    name: string;
}

export interface DidChangeWorkspaceFoldersParams {
	/**
	 * The actual workspace folder change event.
	 */
    event: WorkspaceFoldersChangeEvent;
}

/**
 * The workspace folder change event.
 */
export interface WorkspaceFoldersChangeEvent {
	/**
	 * The array of added workspace folders
	 */
    added: WorkspaceFolder[];

	/**
	 * The array of the removed workspace folders
	 */
    removed: WorkspaceFolder[];
}

export interface ExtendedInitializeParams extends vscode.InitializeParams {
    workspaceFolders: WorkspaceFolder[];
}

export function registerOnDidChangeWorkspaceFolders (connection: vscode.Connection, callback: (params: DidChangeWorkspaceFoldersParams) => void) {
    const notificationType = new vscode.NotificationType<DidChangeWorkspaceFoldersParams, void>('workspace/didChangeWorkspaceFolders');
    connection.onNotification(notificationType, callback);
}

export type Connection = vscode.Connection<_, _, _, _, _, vscode.ProposedFeatures.WorkspaceFolders & vscode.ProposedFeatures.Configuration>;

export function getDocumentSettings(connection: Connection, document: vscode.TextDocument): Thenable<any> {
    return connection.workspace.getConfiguration({ scopeUri: document.uri });
}

export function getWorkspaceFolders(connection: Connection): Thenable<WorkspaceFolder[] | null> {
    return connection.workspace.getWorkspaceFolders();
}


