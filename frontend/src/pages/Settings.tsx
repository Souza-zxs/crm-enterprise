import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { WhatsAppConnection } from '../types';

export const Settings: React.FC = () => {
  const [whatsappConnections, setWhatsappConnections] = useState<WhatsAppConnection[]>([
    {
      id: 1,
      phoneNumber: '5511999999999',
      businessAccountId: 'acc_123456',
      status: 'ACTIVE',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/5511999999999',
      connectedAt: '2024-02-01T10:30:00',
    },
  ]);

  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<WhatsAppConnection | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:ml-64 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as integrações e configurações da sua empresa</p>
      </div>

      {/* WhatsApp Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Conexões WhatsApp</h2>
          <button
            onClick={() => {
              setSelectedConnection(null);
              setShowQRModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Conectar WhatsApp
          </button>
        </div>

        {/* Connections List */}
        <div className="space-y-4">
          {whatsappConnections.map((connection) => (
            <div key={connection.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">WhatsApp Business</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {connection.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Número: <span className="font-semibold">{connection.phoneNumber}</span>
                  </p>
                  <p className="text-gray-600">
                    Conectado em: {new Date(connection.connectedAt || '').toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedConnection(connection);
                      setShowQRModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Ver QR Code
                  </button>
                  <button
                    onClick={() => handleCopyPhone(connection.phoneNumber)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copiar número"
                  >
                    {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-gray-600" />}
                  </button>
                  <button
                    onClick={() => setWhatsappConnections(whatsappConnections.filter(c => c.id !== connection.id))}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Remover"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* API Key Display */}
              <div className="bg-gray-50 p-3 rounded-lg mt-4">
                <p className="text-xs text-gray-600 mb-2">ID da Conta de Negócios</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-gray-900 flex-1 truncate">{connection.businessAccountId}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(connection.businessAccountId)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Configurações da Empresa</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Empresa</label>
              <input
                type="text"
                defaultValue="Tech Solutions"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="contato@techsolutions.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Chaves de API</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Mantenha suas chaves de API seguras. Não as compartilhe com ninguém.
              </p>
            </div>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
              Gerar Nova Chave
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">QR Code WhatsApp</h3>
            <div className="bg-gray-50 p-4 rounded-lg flex justify-center mb-4">
              {selectedConnection ? (
                <QRCode
                  value={`https://wa.me/${selectedConnection.phoneNumber}`}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Escaneie este código para conectar seu WhatsApp</p>
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">QR Code será exibido aqui</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors"
              >
                Fechar
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Copiar Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
